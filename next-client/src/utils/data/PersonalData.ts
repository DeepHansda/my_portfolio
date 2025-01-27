"use client"
import { IconType } from 'react-icons';
import { BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";


type SocialLink = {
  name: string;
  url: string;
  icon: IconType,
  color: string
};
export const aboutData = [
  {
    course: "DIPLOMA IN COMPUTER SCIENCE & TECHNOLOGY",
    university: "KANYAPUR POLYTECHNIC - ASANSOL , INDIA",
    date: "2022",
  },
  {
    course: "HIGHER SECONDARY",
    university: "D.V.C HIGH SCHOOL",
    date: "2019",
  },
  {
    course: "SECONDARY",
    university: "D.V.C HIGH SCHOOL",
    date: "2017",
  }

];

export const socialLinks: SocialLink[] = [
  {
    name: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=+919647750384",
    icon: BsWhatsapp,
    color: "success"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/deep-hansda-44627a20a/",
    icon: FiLinkedin,
    color: "primary"
  },
  {
    name: "GitHub",
    url: "https://github.com/DeepHansda",
    icon: FiGithub,
    color: "default"
  },
  {
    name: "X",
    url: "https://x.com/DeepHansda31337",
    icon: BsTwitterX,
    color: "primary"
  }
]