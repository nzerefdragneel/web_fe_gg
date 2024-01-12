import { useState, useEffect } from "react";
import classService from "../../services/class.service";

export function StudentTabGrade(id) {
    const [scorings, setScorings] = useState([]);
    const [messageScorings, setMessageScorings] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await classService.getScorings(id.id);
                setScorings(res.data.data);
                setMessageScorings("");
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setMessageScorings(error.message);
            }
        };
        fetchData();
    }, [id]);

    const currentId = JSON.parse(localStorage.getItem("user")).id;

    const assignmentsList = [];
    scorings.forEach((scoring) => {
        scoring.studentScore.forEach((assignment) => {
            if (
                !assignmentsList.includes(
                    assignment.assignmentName +
                        ` (${assignment.assignmentScale}%)`
                )
            ) {
                assignmentsList.push(
                    assignment.assignmentName +
                        ` (${assignment.assignmentScale}%)`
                );
            }
        });
    });

    const studentsGrade = [];
    scorings.forEach((scoring) => {
        if (scoring.studentId === currentId) {
            const studentGrade = {
                studentId: scoring.studentMssv,
                assignments: [],
            };
            let total = 0;
            scoring.studentScore.forEach((assignment) => {
                if (assignment.assignmentIsFinalized) {
                    studentGrade.assignments.push(assignment.assignmentScore);
                    total +=
                        assignment.assignmentScore *
                        (assignment.assignmentScale / 100);
                } else {
                    studentGrade.assignments.push(null);
                }
            });
            studentGrade.total =
                Math.round((total + Number.EPSILON) * 100) / 100;

            studentsGrade.push(studentGrade);
        }
    });

    return (
        <div className=" ">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Student ID</th>
                        {assignmentsList.length ? (
                            assignmentsList.map((value) => (
                                <th scope="col" key={value}>
                                    {value}
                                </th>
                            ))
                        ) : (
                            <th scope="col"></th>
                        )}
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsGrade.length ? (
                        studentsGrade.map((student) => (
                            <tr key={student.studentId}>
                                <th scope="row">{student.studentId}</th>
                                {student.assignments.length ? (
                                    student.assignments.map((score) => (
                                        <td>{score ? score : "N/A"}</td>
                                    ))
                                ) : (
                                    <td></td>
                                )}
                                <td>{student.total}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No Student Found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
