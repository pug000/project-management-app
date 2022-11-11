const addFetchOptions = (
  url: string,
  method: string,
  params: Record<string, number | string> = {}
) => ({
  url,
  method,
  params,
});

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((item) => `%${`00${item.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export { addFetchOptions, parseJwt };
