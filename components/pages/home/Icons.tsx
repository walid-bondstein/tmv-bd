import { MessageCircleMore } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Phone } from "lucide-react";

export default function Icons() {
  return (
    <div>
      <div className="bg-submit p-3 rounded-full hover:scale-110 transition-transform fixed bottom-30 right-15 shadow-2xl">
        <MessageCircleMore className="w-10 h-10 text-[#FDD10E] fill-white " />
      </div>
      <div className=" bg-black p-3 rounded-full hover:scale-110 transition-transform fixed bottom-10 right-15 shadow-2xl">
        <MessageCircle className="w-10 h-10 text-[#070707] fill-white " />
      </div>
    </div>
  );
}
