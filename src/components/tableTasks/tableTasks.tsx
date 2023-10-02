import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'

import { AiOutlineDelete, AiFillEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/Ai'
import { api } from '../../services/api';
import axios from 'axios';


type TTasks = {
    title: string,
    description: string,
    dateTime: Date
    duration: string
}

type THolidays = {
    date: string
    localName: string
    name: string
    countryCode: string
    fixed: boolean
    global: boolean
    counties: boolean
    launchYear: boolean
    types: []
}

type IRequestTasks = {
    tasks: TTasks[]
    totalTasks: number
}

function TaskTable() {
    const [tasks, setTasks] = useState<TTasks[] | []>([])
    const [holidays, setHolidays] = useState<THolidays[]>([]);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

   useEffect(() => {

    const token = localStorage.getItem('@TokenDailyAgenda')

    const fetchTasks = async () => {
        try {
          const response = await api.get<IRequestTasks>('/mytasks', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
          });
          setTasks(response.data.tasks);
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
        }
    };
    

    // Buscar feriados nacionais da API
    const fetchHolidays = async () => {
        try {
            const response = await axios.get<THolidays[]>(
            'https://date.nager.at/api/v3/PublicHolidays/2023/BR'
            );
            setHolidays(response.data);
        } catch (error) {
            console.error('Erro ao buscar feriados:', error);
        }
    };

    fetchTasks();
    fetchHolidays();
   }, [])

   function formatDateTime(dateTimeStr: Date) {
    const dateTime = new Date(dateTimeStr);

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
  
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
  
    const month = dateTime.getMonth() + 1; 
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
  
 
    const dateStr = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    

    return `${timeStr} - ${dateStr}`
  }

  const toggleEditRow = (rowIndex: number) => {
    setEditingRowIndex(rowIndex === editingRowIndex ? null : rowIndex);
  };

    // Função para salvar as edições e sair do modo de edição
    const saveEditRow = () => {
        setEditingRowIndex(null);
    };
    
    const cancelEditRow = () => {
        setEditingRowIndex(null);
    };


    const isHoliday = (date: Date) => {
        const splitDate = String(date).split('T')[0]
        console.log('splitDate', splitDate)
        const isHos = holidays.find((holiday) => holiday.date === splitDate);
        if (isHos) {
            console.log('isHos', isHos)
        }
        return isHos
    };

  return (
    <div className={styles.tabletasks} >
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr className={styles.th} >
                <th >Title</th>
                <th >Description</th>
                <th >Date</th>
                <th>Duration</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                <tr key={index}  className={isHoliday(task.dateTime) ? styles.holyday : ''} >
                <td>
                {editingRowIndex === index ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].title = e.target.value;
                      setTasks(updatedTasks);
                    }}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingRowIndex === index ? (
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].description = e.target.value;
                      setTasks(updatedTasks);
                    }}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>{formatDateTime(task.dateTime)}</td>
                    <td>
                            {editingRowIndex === index ? (
                            <input
                                type="text"
                                value={task.duration}
                                onChange={(e) => {
                                const updatedTasks = [...tasks];
                                updatedTasks[index].duration = e.target.value;
                                setTasks(updatedTasks);
                                }}
                            />
                            ) : (
                            task.duration + ' hours'
                            )}
                        </td>
                        <td>
                            {editingRowIndex === index ? (
                            <div >
                                <a onClick={saveEditRow} className={styles.options}>
                                <AiOutlineSave />
                                </a>
                                <a onClick={cancelEditRow} className={styles.options}>
                                <AiOutlineClose />
                                </a>
                            </div>
                            ) : (
                            <div >
                                <a
                                className={styles.options}
                                onClick={() => toggleEditRow(index)}
                                >
                                <AiFillEdit />
                                </a>
                                <a className={styles.options}>
                                <AiOutlineDelete />
                                </a>
                            </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default TaskTable;
