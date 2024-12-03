import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/media.module.css';  

export default function MediaPage() {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [media, setMedia] = useState('');
  const [resultado, setResultado] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const router = useRouter();

  const calcularMedia = () => {
    if (!disciplina) {
      alert("Por favor, selecione uma disciplina.");
      return;
    }

    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);

    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10) {
      alert("Por favor, insira notas válidas entre 0 e 10.");
      return;
    }

    const mediaCalculada = (n1 + n2) / 2;
    setMedia(mediaCalculada.toFixed(2));

    setResultado(mediaCalculada >= 7 ? "Aprovado" : "Reprovado");
  };

  const voltarParaDashboard = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    document.title = "Calcular Média";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topLeft}>
        <img src="/images/MEUCRALOGO.jpg" alt="MEUCRALOGO" className={styles.logoTopLeft} />
      </div>

      <div id="app" className={styles.app}>
        <header>
          <h1>Calcular Média</h1>
        </header>
        <main>
          <div>
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className={styles.dropdown}
            >
              <option value="">Selecione uma disciplina</option>
              <option value="Front-end Framework">Front-end Framework</option>
              <option value="Programação Orientada a Objetos">Programação Orientada a Objetos</option>
              <option value="Estrutura de Dados">Estrutura de Dados</option>
              <option value="Banco de Dados">Banco de Dados</option>
              <option value="Desenvolvimento de Aplicações para Internet">Desenvolvimento de Aplicações para Internet</option>
              <option value="Análise e Modelagem de Sistemas">Análise e Modelagem de Sistemas</option>
              <option value="Design Centrado no Ser Humano">Design Centrado no Ser Humano</option>
              <option value="Lógica de Programação">Lógica de Programação</option>
              <option value="Matemática Aplicada">Matemática Aplicada</option>
              <option value="Desenvolvimento Pessoal e Trabalhabilidade">Desenvolvimento Pessoal e Trabalhabilidade</option>
              <option value="Desenvolvimento Sustentável e Direitos Individuais">
                Desenvolvimento Sustentável e Direitos Individuais
              </option>
              <option value="Engenharia de Software e Gestão de Times Ágeis">
                Engenharia de Software e Gestão de Times Ágeis
              </option>
            </select>
          </div>
          <div className={styles.notasContainer}>
            <input
              type="number"
              placeholder="Unidade 1"
              value={nota1}
              onChange={(e) => setNota1(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Unidade 2"
              value={nota2}
              onChange={(e) => setNota2(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Média"
              value={media}
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.resultado}>
            {resultado && (
              <span style={{ color: resultado === 'Aprovado' ? 'green' : 'red' }}>{resultado}</span>
            )}
          </div>
          <button onClick={calcularMedia} className={styles.btnAzul}>
            Calcular
          </button>
          <button onClick={voltarParaDashboard} className={styles.btnLaranja}>
            Voltar
          </button>
        </main>
      </div>
    </div>
  );
}