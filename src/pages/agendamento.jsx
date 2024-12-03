import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/agendamento.module.css';

export default function AgendamentoPage() {
    const [agendamento, setAgendamento] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const router = useRouter();

    useEffect(() => {
        document.title = "Agendamento Geral"; 
    }, []);

    const agendar = () => {
        if (!agendamento || !data || !hora) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const agora = new Date();
        const dataSelecionada = new Date(`${data}T${hora}`);

        if (dataSelecionada <= agora) {
            setMensagem('Agendamento não concluído: data ou horário inválidos.');
            setTipoMensagem('erro');
            return;
        }

        const dataPartes = data.split('-');
        const dataFormatada = `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`;
        const horaFormatada = hora;
        const local = agendamento.replace('Agendamento ', '');

        const novoAgendamento = {
            local,
            data: dataFormatada,
            hora: horaFormatada,
        };

        const agendamentosExistentes = JSON.parse(localStorage.getItem('agendamentos')) || [];
        const novosAgendamentos = [...agendamentosExistentes, novoAgendamento];
        localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));

        setMensagem(`Agendamento concluído para ${dataFormatada} às ${horaFormatada} no ${local}!`);
        setTipoMensagem('sucesso');
    };

    const voltarParaDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <div className={styles.topLeft}>
                <img src="/images/MEUCRALOGO.jpg" alt="MEUCRALOGO" className={styles.logoTopLeft} />
            </div>
            <div id="app" className={styles.app}>
                <header>
                    <h1>Agendamento Geral</h1>
                </header>
                <main>
                    <div>
                        <select
                            value={agendamento}
                            onChange={(e) => setAgendamento(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="">Selecione onde deseja agendar:</option>
                            <option value="Agendamento CRA">Agendamento CRA</option>
                            <option value="Agendamento Financeiro">Agendamento Financeiro</option>
                        </select>
                    </div>
                    <div className={styles.data}>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.horario}>
                        <input
                            type="time"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button onClick={agendar} className={styles.btnAzul}>
                        Agendar
                    </button>
                    <button onClick={voltarParaDashboard} className={styles.btnLaranja}>
                        Voltar
                    </button>
                    {mensagem && (
                        <p
                            className={`${styles.mensagem} ${
                                tipoMensagem === 'erro' ? styles.mensagemErro : styles.mensagemSucesso
                            }`}
                        >
                            {mensagem}
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
}