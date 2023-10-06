import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";
test("apiden gelen veriler için ekrana card basılır ", async () => {
  // test edeceğimiz component
  render(<Scoops />);

  // test ortamında seçicilerin kullanılması
  // komut [yapıkısmı] seçici

  // * getByRole

  // komut belirleme kriteri
  // * get => element eğer başlangıçta varsa get metodu kullanılır

  // * find => eğer elementin ekrana ne zaman basılacağı belli değil ise find kullanılır
  // * (eğer elementler api gibi kaynaktan geliyor ise)

  // * query => elementler dom'da yoksa ve koşula göre render ediliyor ise kullanılır

  // ? not:  find metodu async bir metod olduğu için async await ile kullanılır
  // resimlere erişme
  const images = await screen.findAllByRole("img", { name: "test-img" });

  expect(images).toHaveLength(4);
});

test("çeşit ekleme işleminin toplam fiyata yansıması ", async () => {
  render(<Scoops />);

  const user = userEvent.setup();
  // toplam fiyata erişme
  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti/i });

  // ekle btn
  const buttons = await screen.findAllByRole("button", { name: "Ekle" });

  // çeşit ekle ve fiyatını kontrol et
  await user.click(buttons[0]);
  expect(total).toHaveTextContent("20");

  await user.dblClick(buttons[1]);

  expect(total).toHaveTextContent("60");
});

test("çeşit sıfırlama işleminin toplama yansıması", async () => {
  render(<Scoops />);

  const user = userEvent.setup();

  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti/i });
  const delButtons = await screen.findAllByRole("button", { name: "Sıfırla" });
  const addButtons = await screen.findAllByRole("button", { name: "Ekle" });

  // iki farklı çeşit ekleme
  await user.click(addButtons[2]);
  await user.dblClick(addButtons[3]);
  expect(total).toHaveTextContent(60);

  // sepette bir tane elemanı sil ve kontrol et
  await user.click(delButtons[2]);
  expect(total).toHaveTextContent(40);

  // sepette iki tane olanı çeşiti sıfırla ve kontrol et
  await user.click(delButtons[3]);
  expect(total).toHaveTextContent(0);
});
