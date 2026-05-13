import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm (vitest + MSW)", () => {
  it("올바른 자격 증명 → 환영 메시지", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("아이디"), "admin");
    await user.type(screen.getByLabelText("비밀번호"), "pass1234");
    await user.click(screen.getByRole("button", { name: "로그인" }));

    expect(await screen.findByTestId("result")).toHaveTextContent("환영합니다, admin!");
  });

  it("잘못된 자격 증명 → 에러 메시지", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("아이디"), "admin");
    await user.type(screen.getByLabelText("비밀번호"), "wrong");
    await user.click(screen.getByRole("button", { name: "로그인" }));

    expect(await screen.findByTestId("result")).toHaveTextContent(/올바르지 않습니다/);
  });
});
