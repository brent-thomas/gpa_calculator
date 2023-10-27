import React, {useState, useEffect} from 'react'

const Gradebook = () => {
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(()=>{
      fetchGrades()
    },1000)
  }, [])
  
  const fetchGrades = () => {
    console.log('called');
    fetch('https://01b4j5d9li.execute-api.us-east-1.amazonaws.com/prod/submitgrade', {
        method: 'GET',
        mode:'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setGrades(data);
        setLoading(false);
    })
    .catch(err => {
        console.error("Error fetching grades:", err);
        setError(err.message);
        setLoading(false);
    });
}

  return (
    <div className='pd-hz pd-vt container'>
            <h3>Student Grades</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && grades && (
             
                <ul>
                    {grades.map((grade, index) => (
                        <li key={index}>
                        Student ID: {grade.StudentID} - Grade: {grade.Grade}</li>
                    ))}
                </ul>
            )}
        </div>
  )
}

export default Gradebook