export const Colours = {
    pontinetPrimary: `#8EC2C2`,
    pontinetSeconday: '#636363',
    pontinetAccent: '#000080',
    pontinetAccent2: '#DBEBFF',
    pontinetInputContainer: '#D9D9D9',
    pontinetCaseBackground: '#E6F2ED',
    greenDot: '#03C95E',
    amberDot: 'orange',
    redDot: '#DE1919',
    black: '#474747',
}

export const caseUrgencyStyle = (submittedDate) =>{

    //TODO unit tests for this

    const Day = 1000 * 60 * 60 * 24;
    const urgent = Day * 3;

    const current = Date.now();
    const dateSubmitted = Date.parse(submittedDate);
    const difference = current - dateSubmitted;

if(difference >= urgent){
    return {
        color: Colours.redDot
    }
}
if (difference < urgent && difference >= Day){
    return {
        color: Colours.amberDot
    }
}
return {
    color: Colours.greenDot
}

}