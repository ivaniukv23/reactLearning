export default function InputGroup({onChangeData, userInput}) {
    return(
        <div id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial investment</label>
                    <input type="number" value={userInput.initialInvestment} onChange={(event) => onChangeData(event.target.value, 'initialInvestment')} required/>
                </p>
                <p>
                    <label>Annual investment</label>
                    <input type="number" value={userInput.annualInvestment} onChange={(event) => onChangeData(event.target.value, 'annualInvestment')} required/>
                </p>
                            
            </div>
            <div className="input-group">
            <p>
                    <label>Expected return</label>
                    <input type="number" value={userInput.expectedReturn} onChange={(event) => onChangeData(event.target.value, 'expectedReturn')} required/>
                </p>
                <p>
                    <label>Duration</label>
                    <input type="number" value={userInput.duration} onChange={(event) => onChangeData(event.target.value, 'duration')} required/>
                </p>            
            </div>
        </div>
    );
}