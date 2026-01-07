"use client"

import { getUserDesign } from "@/service/design-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RecentDesign() {
  const [UserDesign, setUserDesign] = useState([])
  const router = useRouter();

  async function fetchUserDesigns() {
    const result = await getUserDesign()

    console.log(result, "result");

  }

  useEffect(() => {
    fetchUserDesigns()
  }, [])

  const designs = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: `Design ${i + 1}`,
    thumbnail: "/placeholder-design.svg"
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Design</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {designs.map((design) => (
          <div onClick={() => router.push(`editor/${design?._id}`)} key={design.id} className="group cursor-pointer">
            <div
              className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-all duration-300 ease-in-out transform group-hover:scale-105"
              style={{ backgroundImage: `url(${design.thumbnail})`, backgroundSize: 'cover' }}
            />
            <p className="font-bold text-sm truncate">{design.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDesign;
