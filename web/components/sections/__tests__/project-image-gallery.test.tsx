import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProjectImageGallery } from "@/components/sections/project-image-gallery"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const normalized = { ...props, alt: String(props.alt ?? "") }
    delete normalized.fill
    const { alt, ...rest } = normalized as Record<string, string>

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt ?? ""} {...rest} />
  },
}))

describe("ProjectImageGallery", () => {
  it("opens dialog with enlarged image on click", () => {
    render(
      <ProjectImageGallery
        images={[
          { src: "/projects/fok-sirius-01.jpeg", alt: "Фото 1" },
          { src: "/projects/fok-sirius-02.jpeg", alt: "Фото 2" },
        ]}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Открыть фото: Фото 1/ }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Фото 1" })).toBeInTheDocument()
  })

  it("navigates between project images inside dialog", () => {
    render(
      <ProjectImageGallery
        images={[
          { src: "/projects/fok-sirius-01.jpeg", alt: "Фото 1" },
          { src: "/projects/fok-sirius-02.jpeg", alt: "Фото 2" },
          { src: "/projects/fok-sirius-03.jpeg", alt: "Фото 3" },
        ]}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Открыть фото: Фото 1/ }))
    expect(screen.getByRole("img", { name: "Фото 1" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /Следующее фото/ }))
    expect(screen.getByRole("img", { name: "Фото 2" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /Предыдущее фото/ }))
    expect(screen.getByRole("img", { name: "Фото 1" })).toBeInTheDocument()
  })
})
