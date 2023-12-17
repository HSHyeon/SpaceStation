import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import followService from "./follow.service.js";
import authService from "../auth/auth.service.js";

const followController = {
  getFollows: asyncHandler(async (req: Request<{ userid?: string }>, res) => {
    const { userid } = req.params;
    if (!userid)
      //TODO: follower ID 검증
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });
    const follows = await followService.getFollows(userid);
    res.json(follows);
  }),

  getFollowers: asyncHandler(async (req: Request<{ userid?: string }>, res) => {
    const { userid } = req.params;
    if (!userid)
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });
    const follows = await followService.getFollowers(userid);
    res.json(follows);
  }),

  getFollowings: asyncHandler(
    async (req: Request<{ userid?: string }>, res) => {
      const { userid } = req.params;
      if (!userid)
        throw new CustomError({
          status: 400,
          message: "유효하지 않은 ID입니다.",
        });
      const follows = await followService.getFollowings(userid);
      res.json(follows);
    },
  ),

  postFollow: asyncHandler(
    async (
      req: Request<{}, {}, { follower: string; following: string }>,
      res,
    ) => {
      const { follower } = req.body;
      const userToken = req.cookies.service_token;
      const following = authService.extractDataFromToken(userToken, "user_id");

      if (!follower)
        throw new CustomError({
          status: 400,
          message: "전달된 내용이 없습니다.",
        });
      else if (follower === following)
        throw new CustomError({
          status: 400,
          message: "자신을 팔로우 할 수 없습니다.",
        });
      followService.postFollow({ follower, following });
      res.status(200).end();
    },
  ),

  deleteFollow: asyncHandler(async (req, res) => {
    const { follower } = req.params;
    const userToken = req.cookies.service_token;
    const following = authService.extractDataFromToken(userToken, "user_id");

    if (!follower)
      throw new CustomError({
        status: 400,
        message: "유효하지 않은 ID입니다.",
      });
    else if (follower === following)
      throw new CustomError({
        status: 400,
        message: "자신을 언팔로우 할 수 없습니다.",
      });
    await followService.deleteFollow(follower, following);
    res.status(200).end();
  }),
};
export default followController;
