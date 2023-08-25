import { useState } from 'react';

const EditUser = ({ data}) => {
    const [name, setName] = useState(data.name);
    const [blance, setBlance] = useState(data.blance);
    const [email, setEmail] = useState(data.email);
    const [registerat, setRegisterat] = useState(data.registerat);
    const [active, setActive] = useState(data.active);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name,
            blance,
            email,
            registerat,
            active,
        };
        
     
    };

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h3>Edit user</h3>
                    <svg
                        className="header__edit"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <form onSubmit={handleSubmit} className="">
                    <div className="input">
                        <label htmlFor="name" className="">
                            name
                        </label>
                        <input
                            required
                            type="text"
                            id="name"
                            className=""
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="blance" className="">
                            blance
                        </label>
                        <input
                            required
                            type="number"
                            id="blance"
                            className=""
                            value={blance}
                            onChange={(event) => setBlance(event.target.value)}
                            placeholder="Enter blance"
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="email" className="">
                            email
                        </label>
                        <input
                            required
                            type="number"
                            id="email"
                            className=""
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email status"
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="registerat" className="">
                            registerat
                        </label>
                        <input
                            required
                            type="text"
                            id="registerat"
                            className="input__registerat"
                            value={registerat}
                            onChange={(event) => setRegisterat(event.target.value)}
                            placeholder="Enter registerat"
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="active" className="active">
                            active
                        </label>
                        <input
                            required
                            type="text"
                            id="active"
                            className="input__active"
                            value={active}
                            onChange={(event) => setActive(event.target.value)}
                            placeholder="Enter active"
                        />
                    </div>
                    <div className="btn">
                        <button
                            type="submit"
                            className="btn_save"
                        >
                            Save Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
