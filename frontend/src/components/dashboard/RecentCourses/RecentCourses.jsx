import { useEffect, useState } from "react";
import "./RecentCourses.css";
import { getRecentCourses } from "../../../services/courseService";

function RecentCourses() {

    const [recentCourses, setRecentCourses] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const loadRecentCourses = async () => {
            try {
                const data = await getRecentCourses();

                if (isMounted) {
                    setRecentCourses(data);
                }
            } catch (error) {
                console.error("Failed to load recent courses:", error);
            }
        };

        loadRecentCourses();

        return () => {
            isMounted = false;
        };
    }, []);


    return (

        <div className="recent-courses">

            <h3>Recent Courses</h3>

            {
                recentCourses.length === 0 ?

                    (

                        <div className="empty-state">

                            No recent courses found.

                        </div>

                    )

                    :

                    (

                        <table>

                            <thead>

                                <tr>

                                    <th>Course</th>

                                    <th>Instructor</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    recentCourses.map((course) => (

                                        <tr key={course.id}>

                                            <td>{course.title}</td>

                                            <td>{course.instructor}</td>

                                            <td>

                                                <span
                                                    className={`status ${course.status.toLowerCase().replace("_", "-")}`}
                                                >

                                                    {course.status.replace("_", " ")}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    )

            }

        </div>

    );

}

export default RecentCourses;