/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss'
import { api } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type ITasksModalProps = {
  isOpen: boolean;
  setModal: (isOpen: boolean) => void;
};

type ICreateTaksSuccess = {
    message: string
}

export function ModalTask({ setModal, isOpen }: ITasksModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    // Aqui você pode enviar os dados do novo item de tarefa para onde quiser
    const newTask = {
      title,
      description,
      dateTime: startDate + ' ' + startTime,
      duration,
    };

    console.log('Nova tarefa:', newTask);

    try {
        const request = await api.post<ICreateTaksSuccess>('/createTask', newTask)
        toast.success(request.data.message)

        setTitle('');
        setDescription('');
        setStartDate('');
        setStartTime('');
        setDuration('');

        closeModal();
    } catch (err) {
        const axiosError = err as any 
        toast.error(axiosError.response?.data?.message)   
    }


  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create New Task"
       
      >
        <div className={styles.title}>
            <h2 >Create New Task</h2>
        </div>
     
        <form onSubmit={handleCreateTask}  className={styles.formSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <label>Duration (in hours):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button type="submit">Criar Tarefa</button>
          <button onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>

      <Toaster />
    </div>
  );
}
