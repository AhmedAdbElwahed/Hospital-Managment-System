import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link as LinkDom} from "react-router-dom";

const CustomBreadcrumbs = ({links= [], pageName = ""}) => {
    return (
        <div role="presentation">
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small"/>}
            >
                {
                    links.map((link, index) => (
                        <LinkDom key={index} to={link.path}>
                            <Typography
                                sx={{display: 'flex', alignItems: 'center'}}
                                color="inherit"
                            >
                                {link.icon}
                            </Typography>
                        </LinkDom>
                    ))
                }
                <Typography
                    sx={{display: 'flex', alignItems: 'center'}}
                    className="text-orange-400"
                >
                    {pageName}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}

export default CustomBreadcrumbs;
