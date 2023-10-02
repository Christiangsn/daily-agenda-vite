import { useState } from 'react';
import styles from './styles.module.scss';
import { ModalTask } from '../modalTask/modalTask';

export function Header() {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);


  return (
    <>
        <header className={styles.appHeader}>
            <div className={styles.appTitle}>
                <h1>Daily Agenda</h1>
            </div>
            <nav className={styles.appNav}>
                <ul>
                <li><a onClick={() => setIsOpen(true)}>Cadastrar Tarefas</a></li>
                <li><a href="#">Sair</a></li>
                </ul>
            </nav>
            <div className={styles.userInfo}>
                <span>Christian</span>
            </div>
        </header>
        <ModalTask  
            isOpen={modalIsOpen}
            setModal={setIsOpen}
        />
    </>

    
  );
}

