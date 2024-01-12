import { useState, useEffect } from "react";
import classService from "../../services/class.service";
import { read, utils, writeFile } from "xlsx";

export function TabGrade(id) {
    const [scorings, setScorings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await classService.getScorings(id.id);
                setScorings(
                    res?.data.data.sort(
                        (a, b) =>
                            a.studentScore.position - b.studentScore.position
                    )
                );
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

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
        const studentGrade = {
            studentId: scoring.studentMssv,
            studentName: scoring.studentName,
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
        studentGrade.total = Math.round((total + Number.EPSILON) * 100) / 100;

        studentsGrade.push(studentGrade);
    });

    const templatesForGrade = () =>
        studentsGrade.map((user) => {
            const userGrade = {};
            userGrade["ID"] = user.studentId;
            user.assignments.forEach((assignment, index) => {
                userGrade[assignmentsList[index]] = assignment
                    ? assignment
                    : "N/A";
            });
            userGrade["Total"] = user.total;
            return userGrade;
        });

    const handleExport = () => {
        const headings = [["ID", ...assignmentsList, "Total"]];
        const data = templatesForGrade();
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "GradeReport.xlsx");
    };

    return (
        <div className=" ">
            {isLoading && (
                <div className=" mx-auto mt-8 text-center">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!isLoading && (
                <>
                    {studentsGrade?.length > 0 && (
                        <div className="mt-3 mb-4 text-right">
                            <button
                                onClick={handleExport}
                                className=" px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mr-2"
                            >
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    )}
                    <div className="mt-3">
                        {studentsGrade?.length === 0 && (
                            <div className="text-center text-xl font-semibold text-dark-green">
                                Class haven't any Student
                            </div>
                        )}
                        {studentsGrade?.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Student ID</th>
                                        <th scope="col">Full Name</th>
                                        {assignmentsList.length ? (
                                            assignmentsList.map(
                                                (value, index) => (
                                                    <th
                                                        scope="col"
                                                        key={index}
                                                        className="text-right"
                                                    >
                                                        {value}
                                                    </th>
                                                )
                                            )
                                        ) : (
                                            <th
                                                scope="col"
                                                className="text-right"
                                            ></th>
                                        )}
                                        <th scope="col" className="text-right">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsGrade?.length > 0 &&
                                        studentsGrade.map((student) => (
                                            <tr
                                                key={student.studentId}
                                                className="hover:bg-neutral-50"
                                            >
                                                <th
                                                    className="text-dark-green"
                                                    scope="row"
                                                >
                                                    {student.studentId}
                                                </th>
                                                <td>{student.studentName}</td>
                                                {student.assignments.length ? (
                                                    student.assignments.map(
                                                        (score, index) => (
                                                            <td
                                                                key={index}
                                                                className="text-right"
                                                            >
                                                                {score
                                                                    ? score
                                                                    : "N/A"}
                                                            </td>
                                                        )
                                                    )
                                                ) : (
                                                    <td></td>
                                                )}
                                                <td className="text-right">
                                                    {student.total}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
