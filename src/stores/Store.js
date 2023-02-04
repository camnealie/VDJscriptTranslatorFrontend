export default class AppStore {
  fetchJson = async () => {
    return new Promise((res) => {
      const b = {
        headers: {
          'content-type': 'application/json',
        },
      };

      fetch('http://localhost:5001/', b)
        .then((response) => response.json())
        .then((e) => {
          console.log('done', e);
          return res(e);
        });
    });
  };

  postJSON = async (e) => {
    return new Promise((res) => {
      const b = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(e),
      };

      fetch('http://localhost:5001/', b)
        .then((response) => response.json())
        .then((e) => {
          console.log('done', e);
          return res(e);
        });
    });
  };
}
