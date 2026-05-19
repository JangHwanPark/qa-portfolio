import { expect, test } from '@playwright/test';

test.describe('Playground Web Test', () => {
    const url = 'http://localhost:63342/Test-Automation/apps/demo-web/playground.html?_ijt=ql913ui02sqc0uv97q0pc6vgl7&_ij_reload=RELOAD_ON_SAVE'

    test('폼 제출시 입력한 글자가 출력된다.', async ({ page}) => {
        const inputText = 'Hello, World!'
        const inputName = page.getByPlaceholder(/이름을 입력/);
        const submit = page.getByRole('button', {name: '인사하기'})
        const result = page.getByTestId('greet-output');

        await page.goto(url);
        await inputName.fill(inputText);
        await submit.click();
        await expect(result.getByText(inputText)).toBeVisible();
        await expect(result).toHaveText(`안녕하세요, ${inputText}님!`)
    });

    test('카운터 버튼을 통해 증가 및 감소 초기화 작업이 가능하다', async ({ page }) => {

    });
});