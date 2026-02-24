export type ProjectCaseFact = {
  label: string
  value: string
}

export type ProjectCase = {
  slug: string
  title: string
  category: string
  location: string
  year: string
  status: string
  summary: string
  description: string[]
  previewImage: string
  videoSrc: string
  videoPoster: string
  facts: ProjectCaseFact[]
  scope: string[]
  gallery: Array<{
    src: string
    alt: string
  }>
}

export const projectCases: ProjectCase[] = [
  {
    slug: "fok-sirius",
    title: "Физкультурно-оздоровительный комплекс «Центр художественной гимнастики»",
    category: "Общественные центры",
    location: "Краснодарский край, пгт. Сириус, ул. Триумфальная, д.7",
    year: "2022",
    status: "Введен в эксплуатацию: сентябрь 2022",
    summary: "Новое строительство, помещения ниже отм. 0,000.",
    description: [
      "Застройщик: ООО «Газпром инвестгазификация».",
      "Выполнено в качестве подрядчика: напыляемая гидроизоляция фасадов, инъектирование и наружное армирование несущих монолитных конструкций, теплоизоляционная штукатурка, отделка.",
    ],
    previewImage: "/projects/fok-sirius-01.jpeg",
    videoSrc: "/projects/fok-sirius-final.mp4",
    videoPoster: "/projects/fok-sirius-poster.jpg",
    facts: [
      { label: "Площадь застройки", value: "10 009,00 м²" },
      { label: "Строительный объем, в т.ч.", value: "185 313,00 м³" },
      { label: "Выше отм. 0,000", value: "154 228,00 м³" },
      { label: "Ниже отм. 0,000", value: "32 036,00 м³" },
      { label: "Общая площадь", value: "23 714,00 м²" },
      { label: "Количество зданий, сооружений", value: "1" },
      { label: "Количество этажей", value: "5 (в т.ч. 1 подземный)" },
      { label: "Этажность", value: "4" },
      { label: "Максимальная высота объекта", value: "25,00 м" },
      { label: "Вместимость", value: "1300 чел." },
    ],
    scope: [
      "Напыляемая гидроизоляция фасадов",
      "Инъектирование несущих монолитных конструкций",
      "Наружное армирование несущих монолитных конструкций",
      "Теплоизоляционная штукатурка",
      "Отделка",
    ],
    gallery: [
      { src: "/projects/fok-sirius-01.jpeg", alt: "ФОК Сириус, общий вид" },
      { src: "/projects/fok-sirius-02.jpeg", alt: "ФОК Сириус, подземный уровень" },
      { src: "/projects/fok-sirius-03.jpeg", alt: "ФОК Сириус, фасадные работы" },
      { src: "/projects/fok-sirius-04.jpeg", alt: "ФОК Сириус, армирование конструкций" },
      { src: "/projects/fok-sirius-05.jpeg", alt: "ФОК Сириус, отделочные работы" },
      { src: "/projects/fok-sirius-06.jpeg", alt: "ФОК Сириус, завершенный объект" },
    ],
  },
  {
    slug: "presidential-lyceum-sirius",
    title: "Жилой корпус интернат АНОО «Президентский Лицей «Сириус»",
    category: "Ревитализация",
    location: "Краснодарский край, пгт. Сириус, ул. Рекордов, д.15",
    year: "2023",
    status: "Введен в эксплуатацию: октябрь 2023",
    summary: "Реконструкция здания гостиницы «Сигма Сириус» под интернат для детей.",
    description: [
      "Застройщик: Образовательный Фонд «Талант и Успех».",
      "Функциональное назначение: интернат для детей.",
    ],
    previewImage: "/projects/presidential-lyceum-sirius/lyceum-01.jpeg",
    videoSrc: "/projects/presidential-lyceum-sirius/lyceum-final.mp4",
    videoPoster: "/projects/presidential-lyceum-sirius/lyceum-01.jpeg",
    facts: [
      { label: "Общая площадь здания после реконструкции", value: "8 309.70 м²" },
      { label: "Площадь открытых неотапливаемых элементов", value: "318.36 м²" },
      { label: "Площадь застройки", value: "1 697.74 м²" },
      { label: "Строительный объем здания после реконструкции", value: "27 758.06 м³" },
      { label: "Подземная часть здания", value: "3 830.66 м³" },
      { label: "Надземная часть здания", value: "23 927.40 м³" },
      { label: "Количество этажей", value: "7" },
    ],
    scope: [
      "Перепланировка помещений",
      "Отделочные работы",
      "Инженерные сети",
      "Благоустройство",
      "Фасадные работы",
      "Размещение номерного фонда на 250 учащихся, в том числе МГН",
      "Организация входной зоны, зон кафе, медпункта с изолятором, зон самоподготовки и индивидуальных занятий",
      "Класс конструктивной пожарной опасности здания: C0",
      "Класс функциональной пожарной опасности здания: Ф1.1",
      "Уровень ответственности: II (нормальный)",
      "Класс сооружения: КС-2",
    ],
    gallery: [
      { src: "/projects/presidential-lyceum-sirius/lyceum-01.jpeg", alt: "Интернат Сириус, вид 1" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-02.jpeg", alt: "Интернат Сириус, вид 2" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-03.jpeg", alt: "Интернат Сириус, вид 3" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-04.jpeg", alt: "Интернат Сириус, вид 4" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-05.jpeg", alt: "Интернат Сириус, вид 5" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-06.jpeg", alt: "Интернат Сириус, вид 6" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-07.jpeg", alt: "Интернат Сириус, вид 7" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-08.jpeg", alt: "Интернат Сириус, вид 8" },
      { src: "/projects/presidential-lyceum-sirius/lyceum-09.jpeg", alt: "Интернат Сириус, вид 9" },
    ],
  },
]

export function getProjectCaseBySlug(slug: string) {
  return projectCases.find((project) => project.slug === slug)
}
