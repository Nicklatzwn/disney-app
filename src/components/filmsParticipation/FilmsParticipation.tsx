import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material';
import { FunctionComponent, useMemo, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { getCharacters, getCharactersParams } from '@/store/characters';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ICustomPoint, IFilmsCount } from '@/models/reusableInterfaces';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Accessibility from 'highcharts/modules/accessibility';

Accessibility(Highcharts);

interface IProps {
  open: boolean;
  onClose: () => void;
}

/**
 * FilmsParticipation Component
 *
 * This component displays a dialog containing a pie chart that visualizes the participation of Disney
 * characters in films. It allows users to view detailed statistics and export the data to an Excel file.
 *
 * @component FilmsParticipation
 * @param {IProps} props - The props for the component.
 * @param {boolean} props.open - A flag indicating whether the dialog is open or closed.
 * @param {() => void} props.onClose - A function to close the dialog.
 * @returns {JSX.Element} A dialog containing a pie chart and an export button for the film participation data.
 */
const FilmsParticipation: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { open, onClose } = props;
  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  const { page } = useSelector(getCharactersParams);
  const characters = useSelector(getCharacters);
  const theme = useTheme();

  const chartData: Highcharts.SeriesMapDataOptions[] = useMemo(() => {
    const filmCounts: Record<string, IFilmsCount> = {};

    characters.forEach((character) => {
      const filmCount = character.films.length;
      if (filmCount > 0) {
        filmCounts[character.name] = filmCounts[character.name] || { count: 0, films: [] };
        filmCounts[character.name].count += filmCount;
        filmCounts[character.name].films.push(...character.films);
      }
    });
    const totalFilms = Object.values(filmCounts).reduce((sum, { count }) => sum + count, 0);

    return Object.entries(filmCounts).map(([name, { count, films }]) => ({
      name,
      y: count,
      percentage: (count / totalFilms) * 100,
      films: films.join(', '),
    }));
  }, [characters]);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: theme.palette.background.default,
    },
    title: {
      text: undefined,
    },
    series: [
      {
        type: 'pie',
        name: 'Films',
        colorByPoint: true,
        data: chartData,
      } as Highcharts.SeriesPieOptions,
    ],
    tooltip: {
      pointFormat:
        'Count: <b>{point.y}</b><br>Percentage: <b>{point.percentage:.2f}%</b><br>Films: <b>{point.films}</b><br>',
    },
  };

  const exportToExcel = () => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const data = chart.series.flatMap((series) =>
        (series.data as ICustomPoint[]).map((point) => [
          point.name || '',
          point.y,
          `${(point.percentage || 0).toFixed(2)}%`,
          point.films || '',
        ])
      );

      const worksheet = XLSX.utils.aoa_to_sheet([['Name', 'Count', 'Percentage', 'Films'], ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `Films Participation - Page ${page}.xlsx`);
    }
  };

  return (
    <Dialog fullWidth onClose={onClose} aria-labelledby="films-participation-dialog" open={open}>
      <DialogTitle id="films-participation-dialog">Films Participation - Page {page}</DialogTitle>
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
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={exportToExcel}>
          Export XLSX
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilmsParticipation;
