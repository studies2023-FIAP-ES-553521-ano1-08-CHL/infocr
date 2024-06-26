import { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

import './styles.scss'

import TextField from '../../components/TextField'
import Exam from '../../components/Exam'

import { getExams } from '../../hooks/useExams'

function Exames() {
  const [listExams, setListExams] = useState([]);
  const [examsFiltered, setExamsFiltered] = useState([]);

  useEffect(() => {
    getExams().then((res)=> {
      const exams = [];
      Object.keys(res).forEach(id => {
        exams.push(res[id]);
      });
  
      const sortedExams = exams.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));

      setListExams(sortedExams);
      setExamsFiltered(sortedExams);
  
      return;
    })
  }, [])

  function handleFindExam(event) {
    setExamsFiltered(listExams.filter(e => e.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())));
  }

  return (
    <div id='exams-page'>
      <h1>Exames</h1>
      <div className='find'>
        <TextField id="find-exam" placeholder="Localizar Exame" onChange={handleFindExam} big />
      </div>
      <div id="exams-lines">
        {
          examsFiltered.length === 0
            ? <h2>Nenhum exame localizado</h2>
            : examsFiltered.map((e, i) => {
              return (
                <Exam key={i} title={e.title} about={e.about} preparations={e.preparations} cantDo={e.cantDo} />
              )
            })
        }
      </div>
      <div id="important-infos">
        <h3>Importante</h3>
        <p>As instruções acima são gerais e podem variar de acordo com o tipo de exame e o local onde ele será realizado.</p>
        <p>Se você tiver dúvidas sobre o preparo para o exame, entre em <HashLink to="/Instituto/#contact">contato</HashLink> com o instituto.</p>
      </div>
    </div>
  )
}

export default Exames