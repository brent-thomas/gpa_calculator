import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [studentId, setStudentId] = useState('')
  const [grade,setGrade] = useState('')

  

  const postGrades = (studentId, grade) => {
    console.log('Posting grades for StudentID:', studentId);

    // Create the request body
    const requestBody = JSON.stringify({
        studentId: studentId,
        grade: grade
    });

    return fetch('https://01b4j5d9li.execute-api.us-east-1.amazonaws.com/prod/submitgrade', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        history.push('/gradebook');

        return data;
    })
    .catch(error => {
        console.error("Error posting grades:", error);
    });
}

  

 
  return (
    <div className='pd-hz pd-vt container'>
      <form>
        <h1>See how your Final Grade compares to your classmastes!</h1>
        <h3>Enter your information:</h3>
        <label>Student Id:</label>
        <p className='tip'>5 digit number only student id</p>
        <input 
        type='text' 
        maxLength={5} 
        placeholder='12345' 
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
/>

        <label>Final Grade:</label>
        <p className='tip'>Format(89.2)</p>
        <input 
          type='text' 
          maxLength={4} 
          placeholder='99'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
      />
        <button type="button" onClick={()=> postGrades(studentId,grade)}> Submit </button>
      </form>
    </div>
  )
}

export default Home