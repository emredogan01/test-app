import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("koşulların onaylanmasına göre button aktifliği", async () => {
  // arka planda test için form componetini ekrana basma
  render(<Form />);

  // tıklama olayları için
  const user = userEvent.setup();

  // gerekli elemanları alma
  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");

  expect(orderBtn).toBeDisabled();

  // chackbox başlıngıçta tiksiz olacak kontrol
  expect(checkBox).not.toBeChecked;

  // checkbox'ı tıkla ve aktifliği kontrol et
  await user.click(checkBox);

  expect(orderBtn).toBeEnabled;

  // checkbox'ın tikini kaldır ve disabled olmasını kontrol et
  await user.click(orderBtn).toBeDisabled;
});

test("onayla buttonu hover olduğunda bildirim ekrana basıldı mı", async () => {
  // arka planfa formu render etme
  render(<Form />);

  // gerekli elementler
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // tıklama olayları için user kurma
  const user = userEvent.setup();

  await user.click(checkBox);

  // button üzerine mouse götürme
  fireEvent.mouseEnter(button);

  const popup = screen.getAllByText("Size gerçekten", { exact: false });
  // exact tüm yazıyı yazmaktansa bir kısmını yazarak erişmeyi sağlar

  expect(popup).toBeVisible;

  // mouse'u buttondan çekme
  fireEvent.mouseLeave(button);

  // popup gözükmeyecek

  expect(button).not.toBeVisible;
});
