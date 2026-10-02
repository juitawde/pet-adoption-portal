import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { petImages } from '../data/pets';
const questions = [['type', 'Which animal makes you smile?', [['dog', 'Dogs'], ['cat', 'Cats'], ['bird', 'Birds'], ['rabbit', 'Rabbits']]], ['time', 'How much time can you spend each day?', [['low', 'Under 1 hour'], ['medium', '1–3 hours'], ['high', '3+ hours']]], ['home', 'What does your home feel like?', [['apartment', 'Apartment'], ['house', 'House'], ['large', 'Large outdoor space']]], ['energy', 'Your ideal companion is…', [['calm', 'Calm & cuddly'], ['balanced', 'A little of everything'], ['active', 'Playful & active']]]];
export default function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [done, setDone] = useState(false);
    const q = questions[step];
    const choose = v => {
        setAnswers({ ...answers, [q[0]]: v });
        if (step < questions.length - 1)
            setStep(step + 1);
        else
            setDone(true);
    };
    if (done) {
        const type = answers.type || 'dog';
        const image = type === 'cat' ? petImages.cat : type === 'bird' ? petImages.bird : type === 'rabbit' ? petImages.rabbit : petImages.dog;
        return <main className="quiz-page">
        <div className="quiz-result">
    <div className="match-visual">
        <img src={image}/>
        <span><Sparkles size={14}/> Your match</span>
    </div>
    <span className="eyebrow">PETMATCH QUIZ</span>
    <h1>You might click with a <em>{type}.</em>
        </h1>
        <p>Based on your answers, a {type} with the right energy and routine could be a wonderful fit. Browse real pets and see who catches your eye.</p>
        <Link className="primary-btn" to={`/pets?type=${type}`}>Meet your matches <ArrowRight size={17}/>
        </Link>
        <button className="text-link" onClick={() => {
                setStep(0);
                setAnswers({});
                setDone(false);
            }}>Retake quiz</button>
        </div>
        </main>;
    }
    ;
    return <main className="quiz-page">
    <div className="quiz-card">
    <div className="quiz-top">
        <Link className="back-link" to="/">
            <ArrowLeft size={16}/>Exit</Link>
            <span>{step + 1} / {questions.length}</span>
        </div>
        <div className="progress">
            <i style={{ width: `${((step + 1) / questions.length) * 100}%` }}/>
        </div>
        <span className="eyebrow">FIND YOUR MATCH</span>
        <h1>{q[1]}</h1>
        <div className="quiz-options">{q[2].map(([v, l]) => <button key={v} onClick={() => choose(v)}>
                <span>{l}</span>
                <ArrowRight size={18}/>
            </button>)}</div>
            <div className="quiz-foot">
                <Sparkles size={16}/>There are no wrong answers — just different kinds of wonderful.</div>
            </div>
        </main>;
}
