import { TrendingUp } from "lucide-react";
const browseitems = [
  {
    title: "#Irys",
    url: "#",
    icon: TrendingUp,
    postCount: "10m+",
  },

  {
    title: "#IrysNft",
    url: "#",
    icon: TrendingUp,
    postCount: "276k",
  },
  {
    title: "#IrysSocials",
    url: "#",
    icon: TrendingUp,
    postCount: "245k",
  },
  {
    title: "#IrysFeed",
    url: "#",
    icon: TrendingUp,
    postCount: "245k",
  },
  {
    title: "#IrysRealms",
    url: "#",
    icon: TrendingUp,
    postCount: "245k",
  },
  {
    title: "#WebDevelopment",
    url: "#",
    icon: TrendingUp,
    postCount: "98k",
  },
  {
    title: "#WebDesign",
    url: "#",
    icon: TrendingUp,
    postCount: "67k",
  },
  {
    title: "#IrysBlogerr",
    url: "#",
    icon: TrendingUp,
    postCount: "45k",
  },
];

const TrendingBar = () => {
  return (
    <div className="w-[400px] xl:flex hidden flex-col border">
      <section className="flex fixed top-10 right-10 flex-col gap-5">
        <h4 className="font-extrabold text-[17px]">Trending now</h4>
        <div className="flex flex-col gap-5">
          {browseitems.map((item) => (
            <div key={item.title}>
              <a href={item.url} className="flex gap-5 items-center">
                <item.icon className="text-primary" size={15} />
                <div className="flex flex-col">
                  <span className="text-gray-300 text-[15px] font-bold">{item.title}</span>
                  <span className="text-[12px] text-gray-500">{item.postCount}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrendingBar;
