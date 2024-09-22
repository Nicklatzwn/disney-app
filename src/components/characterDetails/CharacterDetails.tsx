import { getCharacter } from '@/store/characters';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@/store/store';
import { clearId } from '@/store/characters';
import CloseIcon from '@mui/icons-material/Close';
import TvIcon from '@mui/icons-material/Tv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

/**
 * CharacterDetails Component
 *
 * This component displays detailed information about a selected Disney character in a dialog.
 * It showcases the character's name, image, and associated media such as TV shows and video games.
 * Users can close the dialog to return to the previous view.
 *
 * @component CharacterDetails
 * @returns {JSX.Element} A dialog containing character details, including the character's name, image,
 * and links to their TV shows and video games.
 */
const CharacterDetails: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const character = useSelector(getCharacter);

  const onClose = () => dispatch(clearId());
  if (!character) return <></>;

  return (
    <Dialog onClose={onClose} aria-labelledby="character-details-title" open={!!character}>
      <DialogTitle id="character-details-title">Character Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 7,
          top: 13,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar alt={character.name} src={character.imageUrl} sx={{ width: 200, height: 200 }} />
          <Box mt={2}>
            <Typography variant="h6" textAlign="center">
              {character.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href={character.sourceUrl} variant="body2" target="_blank">
                {character.sourceUrl}
              </Link>
            </Typography>
          </Box>
        </Box>
        <List>
          {character.tvShows.length > 0 && (
            <ListItem>
              <ListItemIcon>
                <TvIcon />
              </ListItemIcon>
              <ListItemText primary="TV Shows" secondary={character.tvShows.join(', ')} />
            </ListItem>
          )}
          {character.videoGames.length > 0 && (
            <ListItem>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Video Games" secondary={character.videoGames.join(', ')} />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetails;
