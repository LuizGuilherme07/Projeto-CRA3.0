import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/login.module.css';

const Login = () => {
  const router = useRouter();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    
    document.title = "Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!matricula || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    sessionStorage.setItem('usuario', JSON.stringify({ matricula, senha }));
    
    setError('');
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src="/images/IMAGEMLOGIN.jpg" alt="Login Image" className={styles.image} />
      </div>
      <div className={styles.rightSide}>
        <img src="/images/MEUCRALOGO.jpg" alt="Logo MEU CRA" className={styles.logo} />
        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="matricula" className={styles.formLabel}>Matrícula ou Email Institucional</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            placeholder="Digite sua matrícula ou email institucional"
            className={styles.formInput}
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <label htmlFor="senha" className={styles.formLabel}>Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            className={styles.formInput}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.formButton}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;