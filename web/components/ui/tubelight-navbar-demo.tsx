import {
  Building2,
  BriefcaseBusiness,
  Cpu,
  Hammer,
  Home,
  Landmark,
} from "lucide-react"

import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: "Главная", url: "/", icon: Home },
    { name: "Процесс", url: "/process", icon: BriefcaseBusiness },
    { name: "Услуги", url: "/services", icon: Hammer },
    { name: "Проекты", url: "/projects", icon: Building2 },
    { name: "Технологии", url: "/technologies", icon: Cpu },
    { name: "Инвесторам", url: "/investors", icon: Landmark },
  ]

  return <NavBar items={navItems} activeUrl="/" />
}
