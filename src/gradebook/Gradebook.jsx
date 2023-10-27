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

  const computeAvgGrade = () => {
    if (!grades || grades.length === 0) return 0;
    const total = grades.reduce((acc, grade) => acc + parseFloat(grade.Grade), 0);
    return (total / grades.length).toFixed(2);
}

function calculateAvgGPA(avgGrade) {
  if (avgGrade >= 90 && avgGrade <= 100) {
      return "4.0";
  } else if (avgGrade >= 80 && avgGrade < 90) {
      return "3.0";
  } else if (avgGrade >= 70 && avgGrade < 80) {
      return "2.0";
  } else if (avgGrade >= 60 && avgGrade < 70) {
      return "1.0";
  } else {
      return "GPA can't be calculated - grades are too low.";
  }
}


  
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
             <div>
              <div className='averages'>
                <p>Average Grade: {computeAvgGrade()}</p>
                <p>Average GPA: {calculateAvgGPA(computeAvgGrade())}</p>
              </div>
             
                <ul>
                    {grades.map((grade, index) => (
                        <li key={index}>
                        Student ID: {grade.StudentID} - Grade: {grade.Grade}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
  )
}

export default Gradebook