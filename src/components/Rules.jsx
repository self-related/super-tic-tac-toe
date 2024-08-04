import "./styles.css";

export default function Rules(_) {

    return (
        <div className="rules">
            <h2>Правила</h2>
            <p>
                <ul>
                    <li>Каждую клетку можно переопределять через 4 хода</li>
                    <li>Середина недоступна первые 5 ходов</li>
                </ul>
            </p>
        </div>
    )
}