//import jwt from "jsonwebtoken";
import UserModel from "../user/user.model.js";

// export type userType = {
//   snsId: string;
//   nickname: string ;
//   profileImgUrl: string ;
// };

const userService = {
  async signUp(snsId: string) {
    const user = {
      snsId,
      nickname: "",
      profileImgUrl: "/profile_default_image.jpeg",
    };

    if (!user.nickname) user.nickname = generateNickname();

    return await UserModel.create(user);
  },
  async signIn() {},
};

export default userService;

// 랜덤 닉네임을 생성하는 함수
function generateNickname() {
  const adjectives = [
    "재빠른",
    "빙빙도는",
    "멋진",
    "신비로운",
    "열정적인",
    "배고픈",
    "빛나는",
    "안쓰러운",
  ];
  const nouns = [
    "도르마무",
    "고양이",
    "사자",
    "호랑이",
    "강산",
    "현지",
    "명준",
    "소현",
    "슬빈",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}`;
}
