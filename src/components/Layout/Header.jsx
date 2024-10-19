import Image from '../../assets/headerbackground.jpg';
import classes from './Header.module.css';

const Header = ({ hideHeader }) => {  // Destructure the hideHeader prop
    return (
        <>
            <header className={classes.header}>
                <h1>Recipe App</h1>
            </header>

            {/* Conditionally render the main image */}
            {!hideHeader && (
                <div className={classes['main-image']}>
                    <img src={Image} alt="A table full of delicious recipes!" />
                </div>
            )}
        </>
    );
};

export default Header;
