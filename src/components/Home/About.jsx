import Header from "./Header";
import profileImage from "../../assets/profile.png";
import { SiGmail, SiGithub } from "react-icons/si";

export default function About() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center mt-24">
        <img
          src={profileImage}
          alt="profile image"
          className="w-52 mb-5 rounded-full"
        />
        <h1 className="mb-10 text-2xl font-bold">Made by Min Ho Jang</h1>
        <h2 className="mb-5 text-2xl font-bold">Contact</h2>
        <div className="flex justify-evenly w-32">
          <a href="mailto:minho00123@gmail.com">
            <SiGmail className="text-4xl hover:text-red" />
          </a>
          <a href="https://github.com/minho00123" target="_blank">
            <SiGithub className="text-4xl hover:text-gray" />
          </a>
        </div>
      </div>
    </>
  );
}
