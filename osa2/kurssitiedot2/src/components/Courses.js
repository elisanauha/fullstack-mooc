import React from 'react';
import Course from './Course'

function Courses({ courses }) {
    return (
        <div>
            {courses.map(course => <Course course={course} key={course.id}></Course>)}
        </div>
    );
}

export default Courses;