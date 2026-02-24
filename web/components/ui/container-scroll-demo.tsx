"use client"

import Image from "next/image"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Эффектный переход при прокрутке
              <br />
              <span className="mt-1 text-4xl leading-none font-bold md:text-[6rem]">
                Скролл-анимация экрана
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          alt="Современное здание"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
