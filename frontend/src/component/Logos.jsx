import { MdOutlineCastForEducation, MdContactSupport, MdOutlineSupportAgent,} from "react-icons/md";
import { IoAccessibilityOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const data = [
  {
    icon: MdOutlineCastForEducation,
    text: "20k+ Online Courses",
    accent: "from-emerald-400 to-green-600",
  },
  {
    icon: IoAccessibilityOutline,
    text: "Lifetime Access",
    accent: "from-sky-400 to-blue-600",
  },
  {
    icon: RiMoneyRupeeCircleLine,
    text: "Value for Money",
    accent: "from-amber-400 to-orange-600",
  },
  {
    icon: MdContactSupport,
    text: "Lifetime Support",
    accent: "from-rose-400 to-pink-600",
  },
  {
    icon: MdOutlineSupportAgent,
    text: "Community Support",
    accent: "from-violet-400 to-purple-600",
  },
];

const Logos = () => {
  return (
    <section className="w-full py-20 px-4">
     
 
 
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="
                group relative w-[200px] h-[80px] rounded-2xl bg-white/70 backdrop-blur-xl                border border-white/40                shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 px-5 cursor-pointer
                transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
              "
            >
              
              <div
                className={`
                  absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-r
                   ${item.accent} blur-xl group-hover:opacity-20 transition
                `}
              />

            
              <div className={` relative z-10 w-12 h-12 rounded-xl
               bg-gradient-to-br 
               ${item.accent} 
               flex items-center justify-center
                shadow-inner
                `}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              
              <span className="relative z-10 text-sm font-medium text-gray-900">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Logos;
