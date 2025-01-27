import { socialLinks } from "@/utils/data/PersonalData";
import { Button } from "@heroui/react";
import Link from "next/link";

function SocialContactBar() {
  return (
    <div className="flex gap-3">
      {socialLinks.map((value, index) => (
        <Link href={value.url} key={index}>
          <Button size="sm" isIconOnly aria-label={value.name} color={value.color} variant="shadow" className="animate-pulse hover:animate-none">
            <value.icon size={18}/>
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default SocialContactBar;
