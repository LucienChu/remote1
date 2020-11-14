import React, { useState, useEffect } from "react";
import styles from "./irisVerticalTabs.module.scss";

export const IrisTab = ({ children }) => {
    return <h2>{children}</h2>;
};

export const IrisTabContent = ({ children }) => {
    return children;
};
export default function IrisVerticalTabs(props) {
    const { children } = props;
    const [optionObject, setOptionObject] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        let children = props.children;
        const name = (<IrisTab />).type.name;
        const contentElementName = (<IrisTabContent />).type.name;
        const options = [];

        if (children) {
            // if it is a single child, wrap it into an array
            // cause by default, if multiple children are provided, they are
            // wrapped into an array
            if (children.length === undefined) {
                children = [children];
            }
            for (const subChilden of children) {
                const tabChild = subChilden.props.children[0];
                const tabContent = subChilden.props.children[1];
                if (
                    tabChild.type.name === name &&
                    tabContent.type.name === contentElementName
                ) {
                    options.push({
                        tabTitle: tabChild.props.children,
                        tabContent: tabContent.props.children,
                    });
                }
            }
        }
        if (options.length !== 0) {
            setOptionObject(options);
            // if (selectedOption && selectedOption.tabTitle) {
            //     const index = options.findIndex(
            //         (option) => option.tabTitle === selectedOption.tabTitle
            //     );
            //     setSelectedOption(options[index]);
            // } else {
            //     setSelectedOption(options[0]);
            // }
        }
    }, [children]);

    useEffect(() => {
        if (selectedOption && selectedOption.tabTitle) {
            const index = optionObject.findIndex(
                (option) => option.tabTitle === selectedOption.tabTitle
            );
            setSelectedOption(optionObject[index]);
        } else {
            setSelectedOption(optionObject[0]);
        }
    }, [optionObject, selectedOption]);

    const selectCity = (index) => {
        setSelectedOption(optionObject[index]);
    };

    return (
        <div style={{ padding: "1rem", height: "100%" }}>
            <div className={styles.tab}>
                {optionObject.map((obj, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${
                            selectedOption &&
                            selectedOption.tabTitle === obj.tabTitle
                                ? styles.activeButton
                                : ""
                        }`}
                        onClick={() => selectCity(index)}
                    >
                        {obj.tabTitle}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                <div style={{ padding: "1rem", height: "100%" }}>
                    {selectedOption && selectedOption.tabContent}
                </div>
            </div>
        </div>
    );
}
