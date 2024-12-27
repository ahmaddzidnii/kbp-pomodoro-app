import { getRandomMotivation } from "../utils/getRandomMotivation";

export const Motivation = () => {
  const motivation = getRandomMotivation();

  return (
    <div className="mt-3 w-full rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <figure className="mx-auto text-center">
        <svg
          className="mx-auto mb-3 h-10 w-10 text-black"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <blockquote>
          <p className="text-md font-medium italic text-black lg:text-xl">
            "{motivation.text}"
          </p>
        </blockquote>
        <figcaption className="mt-3">
          <div className="text-gray-500">-{motivation.author}</div>
        </figcaption>
      </figure>
    </div>
  );
};
