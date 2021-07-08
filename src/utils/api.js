export const getCartProducts = async () => {
  try {
    const response = await fetch('http://localhost:3030/api/cart');
    return await response.json();
  } catch (err) {
    throw new Error('Ups... Coś poszło nie tak w trakcie pobierania produktów. Odśwież stronę, jeżeli to nie zadziała skontaktuj się z nami');
  }
};

export const checkProduct = async (pid, quantity) => {
  try {
    const response = await fetch('http://localhost:3030/api/product/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({pid, quantity}),
    });
    return await response.json();
  } catch (err) {
    throw new Error('Ups... Coś poszło nie tak w trakcie sprawdzania poprawności produktów. Odśwież stronę i spróbuj pownonie.');
  }
}
