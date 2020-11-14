import React, { useState, useEffect } from "react";
import { IrisTab, IrisTabContent } from "../verticalTabs/IrisVerticalTabs";
import styles from "./irisHorizontalTabs.module.scss";

export default function IrisHorizontalTabs(props) {
    const { width, children } = props;
    const [optionObject, setOptionObject] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        if (width) {
            document.getElementById("tab-container").style.width = width + "px";
        }
    }, [width]);

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
        <div id="tab-container" className={styles.container}>
            <div className={styles.top}>
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
            <div className={styles.bottom}>
                <div className={styles.tabContent}>
                    {selectedOption && selectedOption.tabContent}
                </div>
            </div>
        </div>
    );
}
