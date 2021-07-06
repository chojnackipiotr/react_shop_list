export const getCartProducts = async () => {
  try {
    const response = await fetch('http://localhost:3030/api/carst');
    return await response.json();
  } catch (err) {
    throw new Error('Ups... Coś poszło nie tak w trakcie pobierania produktów. Odśwież stronę, jeżeli to nie zadziała skontaktuj się z nami');
  }
};
