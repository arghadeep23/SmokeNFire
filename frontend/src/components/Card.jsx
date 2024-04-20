import madness from "../madness";
export default function Card({ data, content, graph, num }) {
    // < !--percent to deg => Math.round(((value / 100) * 180 - 45) * 10) / 10 -- >
    const rotationValue = graph == "Yes" ? Math.floor(Math.round(((data / 100) * 180 - 45) * 10) / 10) : 0;
    const classNam = madness[rotationValue]
    return (
        <div className="bg-[#1f565f] px-10 py-14 rounded-xl">
            <div className="mb-5">
                <h1 className="text-center text-lg text-white">{content}</h1>
            </div>
            {graph === "Yes" && <div class="relative flex aspect-[2] items-center justify-center overflow-hidden rounded-t-full bg-[#008184] w-44">
                <div class={classNam}></div>
                <div class="absolute top-1/4 flex aspect-square w-3/4 justify-center rounded-full bg-[#1f565f]"></div>
                <div class="absolute bottom-0 w-full truncate text-center text-[30px] leading-none text-white">{data} {content === "Temperature" ? "°C" : ""} {content == "Humidity" ? "%" : ""}</div>
            </div>}
            {
                graph === "No" && num != "6" &&
                <div className="w-44 h-[5.5rem] p-6">
                    <h1 className="text-center text-3xl text-white">{data} {num == "3" ? "ppm" : ""}</h1>
                </div>
            }
            {
                graph === "No" && num == "6" &&
                <div className="w-44 h-[5.5rem] p-6">
                    <h1 className="text-center text-xl text-white">{data}</h1>
                </div>
            }
        </div>
    )
}