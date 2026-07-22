import "./StatCard.css";

function StatCard({ title, value, icon, color }) {

    return (

        <div className="stat-card">

            <div
                className="stat-icon"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>

            <div className="stat-content">

                <h5>{title}</h5>

                <h2>{value}</h2>

            </div>

        </div>

    );

}

export default StatCard;