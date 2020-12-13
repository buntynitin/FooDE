import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { IconButton,InputAdornment, Input } from '@material-ui/core';
import Send from "@material-ui/icons/Send";
import Fastfood from "@material-ui/icons/Fastfood";
import { UserContext } from "./UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        border: 'solid 1px rgb(203,203,203)',
        borderRadius: '4px',
        padding: theme.spacing(2),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function ChipsArray() {
    const classes = useStyles();
    const [state] = useContext(UserContext);
    var { tags } = state.user;


    const [newItem, setNewItem] = React.useState('')
    const [keyCount, setKeyCount] = React.useState(100)
    const [chipdata,setChipData] = React.useState(tags)

    const handleDelete = (chipToDelete) => () => {
        
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].key === chipToDelete.key) { 
                tags.splice(i, 1); 
                break;
            }
        }
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        
    };

    const handleEnter = (e) => {
        // if (e.key === 'Enter' && !(newItem === '')) {
        if (!(newItem === '')) {
            const added = { key: keyCount, label: newItem }
            tags.push(added)
            setChipData(tags)
            setKeyCount(keyCount - 1)
            setNewItem('')
        }

        // }



    };
    return (
     
            <div component="ul" className={classes.root} >

                <Chip

                    label="Restaurant tags"

                    className={classes.chip}
                />
                {chipdata.map((data) => {
                    return (

                        <li key={data.key}>
                            <Chip
                                icon={<Fastfood style={{ fontSize: 15 }} />}
                                label={data.label}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                        </li>



                    );
                })}

                <Input id="standard-basic" placeholder="Add" value={newItem} size="small" onChange={(e) => setNewItem(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleEnter}>
                                <Send color={newItem ? "primary" : "inherit"} />
                            </IconButton>
                        </InputAdornment>
                    }
                />


            </div>

        
    );
}

export default ChipsArray