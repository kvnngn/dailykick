import React, { useRef } from 'react'
import {
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  Typography,
} from '@mui/material'

export const FilterGrid: React.FC = ({ children }) => (
  <Grid container direction="column" rowSpacing={2}>
    {children}
  </Grid>
)

export const FilterGridItem: React.FC<{ label: string }> = ({
  label,
  children,
}) => (
  <Grid container item alignItems="center" columnSpacing={3}>
    <Grid item xs={3}>
      <Typography variant="body2" align="right" sx={{ wordBreak: 'keep-all' }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={9}>
      {children}
    </Grid>
  </Grid>
)

type FilterSelectProps = Pick<
  SelectProps<Array<string>>,
  'name' | 'value' | 'onChange' | 'onBlur' | 'renderValue'
> & {
  selected: Array<string>
  candidate: Array<string> | ReadonlyArray<string>
  formatter?: (v: string) => any
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  renderValue,
  candidate,
  selected,
  formatter,
}) => {
  const formRef = useRef()
  if (!selected || !candidate) {
    return null
  }
  return (
    <FormControl ref={formRef} fullWidth>
      <Select
        size="small"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        renderValue={renderValue}
        input={<OutlinedInput />}
        disabled={Boolean(!candidate?.length)}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 350,
              overflowY: 'auto',
            },
          },
          MenuListProps: {
            disablePadding: true,
          },
        }}
        multiple
      >
        <MenuItem value={null}>
          <Checkbox
            size="medium"
            checked={selected.length === Number(candidate.length)}
            indeterminate={
              selected.length !== 0 &&
              selected.length !== Number(candidate.length)
            }
          />
          <ListItemText
            primary={`${
              selected.length === Number(candidate.length)
                ? 'Select all'
                : 'Unselect all'
            } (${candidate.length})`}
          />
        </MenuItem>
        {candidate.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox size="medium" checked={selected.indexOf(item) > -1} />
            <ListItemText primary={formatter ? formatter(item) : item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
FilterSelect.defaultProps = {
  formatter: undefined,
}
