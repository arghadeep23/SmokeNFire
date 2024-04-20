import madness from "../madness";
export default function Card({ data, content }) {
    // < !--percent to deg => Math.round(((value / 100) * 180 - 45) * 10) / 10 -- >
    const rotationValue = Math.floor(Math.round(((data / 100) * 180 - 45) * 10) / 10);
    console.log(data, rotationValue);
    const classNam = madness[rotationValue]
    return (
        <div className="bg-[#1f565f] px-10 py-14 rounded-xl">
            <div className="mb-5">
                <h1 className="text-center text-lg text-white">{content}</h1>
            </div>
            <div class="relative flex aspect-[2] items-center justify-center overflow-hidden rounded-t-full bg-[#008184] w-60">
                <div class={classNam}></div>
                {/* <div className="absolute top-0 aspect-square w-full rotate-[61deg] bg-gradient-to-tr from-transparent from-50% to-white to-50% transition-transform duration-500"></div> */}
                <div class="absolute top-1/4 flex aspect-square w-3/4 justify-center rounded-full bg-[#1f565f]"></div>
                <div class="absolute bottom-0 w-full truncate text-center text-[30px] leading-none text-white">{data} {content === "Temperature" ? "°C" : ""}</div>
            </div>
        </div>
    )
}