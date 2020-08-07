import React, { useState, useContext } from 'react';

import client from '#feathers';
import AuthContext from '#feathers/AuthContext';
import { Language } from '#shared/constants';
import Button from '#shared/Button';
import FileUpload from '#shared/FileUpload';

import Download from './Download';
import NavBar from './NavBar';

const getLanguage = (loggedIn: boolean): Language => {
  if (loggedIn) {
    return (localStorage.getItem('lang') as Language) ?? Language.Eng;
  } else {
    return Language.Eng;
  }
};

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState('');
  const [link, setLink] = useState('');

  const auth = useContext(AuthContext);

  const [lang, setLang] = useState(getLanguage(auth.loggedIn));

  const submit = async () => {
    if (file === null) return;

    const data = new FormData();

    data.append('file', file);

    setProgress('Converting...');

    const { route: downloadRoute } = await client.service('braille').create(data, {
      query: {
        lang,
      },
    });

    setProgress('');
    setLink(downloadRoute);
  };

  const setHin = () => {
    localStorage.setItem('lang', Language.Hin);
    setLang(Language.Hin);
  };
  const setEng = () => {
    setLang(Language.Eng);
  };

  let pValue = '';

  if (file != null && file.name) {
    pValue = 'Selected File: ' + file.name;
  }

  return (
    <main className="demo">
      <NavBar lang={lang} setHin={setHin} setEng={setEng} />
      <FileUpload setFile={setFile} />
      <p className="file-name">{pValue}</p>
      <Button
        name="Submit"
        onClick={submit}
        className="submit-btn"
        disabled={file === null}
        aria-label="Submit for translation"
      />
      <p className="file-name">{progress}</p>
      {link.length ? <Download className="download btn" link={link} /> : null}
    </main>
  );
}

export default Home;
